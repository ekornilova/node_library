Каждый документ коллекции books должен содержать следующую структуру данных:

{
title: "string",
description: "string",
authors: "string"
}

запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

db.books.insertMany([
{ title: "title1", description: "description1", authors: "authors1" },
{ title: "title2", description: "description2", authors: "authors2" },
]);

db.books.insertOne({ title: "title3", description: "description3", authors: "authors3" });

запрос для поиска полей документов коллекции books по полю title

db.books.find( { title: "title1" } )

запрос для редактирования полей: description и authors коллекции books по \_id записи

db.books.updateOne(
{ \_id: "636ac2dfbdaa082eff9d5af8" },
{
$set:{
description: "description4", authors: "authors4"
}
}

)
