

module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    const insertedProffy = await db.run(`
        insert into proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) values (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    const insertedClass = await db.run(`
            insert into classes (
                subject,
                cost,
                proffy_id
            ) values (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    const insertedAllClassScheduleValues = classScheduleValues.map((value)=>{
        return db.run(`
            insert into class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) values (
                "${class_id}",
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}"
            );
        `)
    })

    await Promise.all(insertedAllClassScheduleValues)
}

