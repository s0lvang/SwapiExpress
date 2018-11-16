# Backend for gruppe 06, 25, 35

## Setup

`git clone`
Installer Postgresql
`sudo apt install postgresql`
Endre passord på postgresbrukeren og lage databasen.
`sudo -u postgres psql swapi`
`ALTER USER postgres WITH PASSWORD passordetDitt`
Endre brukernavn og passord i config.json til postgres og ditt passord. 
`npm install && npm start`

## Mål 
Denne databasens mål var å delvis speile Star Wars API'et, kjent som [Swapi](https://swapi.co/), ved å bygge det opp på nytt med Node. Vi ville dekke så mange bruksområder som mulig, da de tre gruppene som benyttet seg av denne databasen hadde ulike planer for sine applikasjoner. Derfor har vi inkludert mye funksjonalitet som allerede var til stede i Swapi, men i tillegg utviklet annen funksjonalitet som vi følte var nødvendig.

## Databasen

### Endepunkter
* `/api/people`: Henter ut person objekter fra databasen
* `/api/planets`: Henter ut planet objekter fra databasen
* `/api/films`: Henter ut film objekter fra databasen
* `/api/vehicles`: Henter ut vehicle objekter fra databasen
* `/api/starships`: Henter ut starship objekter fra databasen
* `/api/species`: Henter ut person objekter fra databasen
* `/api/search`: Henter ut en liste over de 10 siste suksessfulle søkene som er gjort på et hvilket som helst endepunkt
* `/api/all`: Post request som chainer kall mot andre endepunkter som er definert i body til requestet

## Utvikling
Vår utviklingsprosess har vært basert på agilitet, da mange krav måtte oppfylles for å tilfredsstille målene til de ulike applikasjonene. Det fungerte slik at alle gruppemedlemmene, også de som ikke jobbet med backend, kunne kommentere og legge til nye issues for funksjonalitet som var nødvendig. Disse utviklet vi som regel individuelt, men hjalp hverandre se igjennom merge requests når dette ble aktuelt. I tillegg jobbet vi sammen om funksjonalitet som krysset over hverandre.

Å kunne jobbe slik fungerte veldig bra. Det var enkelt å hoppe på et nytt issue, da bruken av teknologiene som vi hadde valgt generelt var lett å sette seg inn i. Å velge et issue var generelt uformelt, som gjorde at arbeidet på backenden var svært effektiv. Under utviklingen av hovedapplikasjonene var utviklingsmetodene generelt gjennomført med strengere konvensjoner. Dette kan leses mer om i de aktuelle prosjekt-repositoriene.

## Testing
Vårt fokus under testingen var å kunne vise til metoder for testing av en database og smart bruk av dette. Vi benyttet blant annet Proxyquire for å mocke importene i databasen. Dette var nødvendig fordi vi måtte unngå at disse kallet til databasen direkte.

## Teknologi
For å hoste databaseserveren har vi benyttet [NodeJS](https://nodejs.org/en/) og [Expressbilbioteket](https://expressjs.com/). Til å styre selve databasen, har vi benyttet [Sequelize](http://docs.sequelizejs.com/) som ORM for å mappe mellom våre objekter og databasen. Databasen baserer seg på [PostgreSQL](https://www.postgresql.org/), som har vist seg å være en godt, relasjonelt databasesystem.

## Samarbeid
Hver gruppe har bistått backenden med ett medlem hver. Grunnet varierende gruppestørrelser, har det vært ulik kapasitet til å bidra med dette. Likevel har vi kommunisert effektivt og bidratt med nødvendig funksjonalitet på individuelt nivå, samt samarbeidet på enkelte issues og merge requests. Siden vi alle er fra forskjellige grupper og dermed har ulike krav til frontend, har vi jobbet med mye ulik funksjonalitet. Som nevnt over, var dette derfor vi valgte å utvikle agilt ved å motta requests og issues fra gruppemedlemmer som behøvde nye funksjoner i applikasjonen. Dette fungerte godt for våre hensikter.