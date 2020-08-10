const Database = require('./database/db')
const { subjects, weekdays, getSubject, convertHoursToMinutes, showModal, closeModal  } = require('./utils/format')



function pageLanding(req, res){
    return res.render("index.html")
}

async function pageStudy(req, res){
    const filters = req.query

    if (!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", { filters, subjects, weekdays })

    }

    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        select classes.*, proffys.*
        from proffys
        join classes on (classes.proffy_id = proffys.id)
        where exists (
            select class_schedule.*
            from class_schedule
            where class_schedule.class_id = classes.id
            and  class_schedule.weekday = ${filters.weekday}
            and class_schedule.time_from <= ${timeToMinutes}
            and class_schedule.time_to > ${timeToMinutes}
        )
        and classes.subject = '${filters.subject}'
    `
            try {
                const db = await Database
                const proffys = await db.all(query)

                proffys.map((proffy) =>{
                    proffy.subject = getSubject(proffy.subject)
                })

                return res.render('study.html', { proffys, subjects, filters, weekdays })
            } catch (error) {
                console.log('erro:', error)
            }
}



function pageGiveClasses(req, res){
     return res.render("give-classes.html", { subjects, weekdays })
}

async function saveClasses(req, res){
    const createProffy = require('./database/createProffy')
 
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue ={
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map((weekday, index) =>{
        return {
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {

        const db = await Database
        
        await createProffy(db, { proffyValue, classValue, classScheduleValues })
        
       
     
        
            let queryString = "?subject=" + req.body.subject
            queryString += "&weekday=" + req.body.weekday[0]
            queryString += "&time=" + req.body.time_from[0]
    
            // const { showModal, closeModal } = require('../public/scripts/showModal')
            // let show = showModal
            // show.showModal()
    
          
                // let close = closeModal

                // closeModal()
                setTimeout(() => {
                return res.redirect("/study" + queryString)
        }, 2000);
         
    } catch (error) {
        console.log('erro:', error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}