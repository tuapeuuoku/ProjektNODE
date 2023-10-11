const { MongoClient } = require('mongodb');
const mongoString = "mongodb+srv://user:1234@cluster0.jxlqwoe.mongodb.net/";

async function main() {
    //stworz nowe połaczenie do bazy danych pod nazwa client używając sterownika MongoClient (alias do mongodb)
    //i danych do połaczenia wygenerowanych z atlasa
    const client = new MongoClient(mongoString);

    try {
        //to spróbuje się zrobić
        //uwaga - otwieram połączenie - to może potrwać więc dajemy await
        await client.connect();
        //pokaż listę baz danych
        await listDB(client);
    } catch (e) {
        //jeśli się wywali na twarz - wyświetl szczegóły w konsoli
        console.error(e)
    } finally {
        //tak czy owak na koniec się zrobi
        //zamykamy połaczenie
        await client.close();
    }
}
//ściągnij listę baz danych i wyświetl w konsoli 
//jako parametr przyjmuje połaczenie do bazy
async function listDB(client) {
    let list = await client.db().admin().listDatabases()
    console.log("Lista baz danych na serwerze:");
    list.databases.forEach(database => {
        console.log("Baza: " + database.name + ", Rozmiar:" + database.sizeOnDisk);

    });
}

main().catch(console.error);