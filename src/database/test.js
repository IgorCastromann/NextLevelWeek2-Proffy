const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db)=>{
     proffyValue = {
        name: "Pablo Escobar",
        avatar: "https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2018/02/pablo-escobar.jpg",
        whatsapp: "99386752",
        bio: "Pablo Emilio Escobar Gaviria foi um narcotraficante colombiano que conquistou fama mundial como (o senhor da droga colombiano), tornando-se um dos homens mais ricos do mundo graças ao tráfico de cocaína nos Estados Unidos e outros países.",
     }

     classValue ={
        subject: 1,
        cost: "360",

     }

     classScheduleValues = [
         {
            weekday: 1,
            time_from: 720,
            time_to: 1220,
         },
         {
            weekday: 0,
            time_from: 520,
            time_to: 1220,
         }
     ]

   //  await createProffy(db, { proffyValue, classValue, classScheduleValues});
  
    const selectedProffys = await  db.all("select * from proffys")
    // console.log(selectedProffys)

    const selectClassesAndProffys = await db.all(`
        select classes.*, proffys.*
        from proffys
        join classes on (classes.proffy_id = proffys.id)
        where classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    const selectClassesSchedules = await db.all(`
        select class_schedule.*
        from class_schedule
        where class_schedule.class_id = 1
        and  class_schedule.weekday = "0"
        and class_schedule.time_from <= "1300"
        and class_schedule.time_to > "1300"
    `)
    //  console.log(selectClassesSchedules)
})