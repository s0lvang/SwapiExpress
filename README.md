# Backend for gruppe 06, 26, 35

Apiet ligger [her](http://it2810-06.idi.ntnu.no/api/api)
Link til frontend-repo (https://github.com/aslakhol/stargazer)

## Setup

`git clone`
Installer Postgresql
`sudo apt install postgresql`
Endre passord på postgresbrukeren og lage databasen.
`sudo -u postgres psql swapi`
`ALTER USER postgres WITH PASSWORD passordetDitt`
Endre brukernavn og passord i config.json til postgres og ditt passord. 
`npm install && npm start`

## Hva skjer når kjører npm start
Babel transpilerer koden vår til ES5 og koden kjøres gjennom nodemon. Nodemon er et bibliotek som ser etter endringer i koden og restarter serveren, slik at du får en lignende opplevelse som react-development-server. Derreter kjøres index.js som setter opp express og rutene gjennom src/routes/index.js. Så kalles src/models/index.js, som itererer gjennom modellene som ligger i samme mappe og setter opp tabellene i databasen. Før jsonFetching kalles som henter swapi-dataen fra githuben til
swapi og setter den inn i databasen.  

## Mål 
Denne databasens mål var å delvis speile Star Wars API'et, kjent som [Swapi](https://swapi.co/), ved å bygge det opp på nytt med Node. Vi ville dekke så mange bruksområder som mulig, da de tre gruppene som benyttet seg av denne databasen hadde ulike planer for sine applikasjoner. Derfor har vi inkludert mye funksjonalitet som allerede var til stede i Swapi, men i tillegg utviklet annen funksjonalitet som vi følte var nødvendig.

### Endepunkter
* `/api/people`: Henter ut person objekter fra databasen
* `/api/planets`: Henter ut planet objekter fra databasen
* `/api/films`: Henter ut film objekter fra databasen
* `/api/vehicles`: Henter ut vehicle objekter fra databasen
* `/api/starships`: Henter ut starship objekter fra databasen
* `/api/species`: Henter ut person objekter fra databasen
* `/api/search`: Henter ut en liste over de 10 siste suksessfulle søkene som er gjort på et hvilket som helst endepunkt
* `/api/all`: Post request som chainer kall mot andre endepunkter som er definert i body til requestet

### Parametre
* `search=`: Henter ut objekter som inneholder søkestrengen i dette parameteret
* `sortBy=`: Lar brukeren sortere det returnerte resultatet på attributtet spesifisert i dette parameteret, men er "id" som standard
* `order=`: Kan være enten "asc" (stigende) eller "desc" (synkende), men er "asc" som standard
* `limit=`: Begrenser antall objekter som returneres fra en nullindeks
* `offset=`: Spesifiserer en nullindeks fra første objekt i den returnerte listen fra databasen
* `exclude=`: Parameter på person objekter, som tar inn en liste og ekskluderer kjønn basert på dette

## Utvikling
Vår utviklingsprosess har vært basert på agilitet, da mange krav måtte oppfylles for å tilfredsstille målene til de ulike applikasjonene. Det fungerte slik at alle gruppemedlemmene, også de som ikke jobbet med backend, kunne kommentere og legge til nye issues for funksjonalitet som var nødvendig. Disse utviklet vi som regel individuelt, men hjalp hverandre se igjennom merge requests når dette ble aktuelt. I tillegg jobbet vi sammen om funksjonalitet som krysset over hverandre.

Å kunne jobbe slik fungerte veldig bra. Det var enkelt å hoppe på et nytt issue, da bruken av teknologiene som vi hadde valgt generelt var lett å sette seg inn i. Å velge et issue var generelt uformelt, som gjorde at arbeidet på backenden var svært effektiv. Under utviklingen av hovedapplikasjonene var utviklingsmetodene generelt gjennomført med strengere konvensjoner. Dette kan leses mer om i de aktuelle prosjekt-repositoriene.

## Deployment
Vi har satt opp en proxy i apache som ruter /api til port 8080, det er kanskje litt uheldig at apiet ligger på /api/api, men vi har valgt og ikke endre dette på grunn av regresjonen det medfører. Vi har også satt opp en service som kjører node serveren vår, slik at du kan starte den med: `sudo systemctl restart swapi`. 

## Testing
Vårt fokus under testingen var å kunne vise til metoder for testing av en database og smart bruk av dette.Teststacken vår er hovedsaklig mocha og chai,  vi benyttet blant annet Proxyquire for dependency-injection, som vil si at den mocker imports i funksjoner. Dette kan man se i massQueryControllerTest.js. Dette var nødvendig fordi vi måtte unngå at disse kallet til databasen direkte.

## Teknologi
For å hoste databaseserveren har vi benyttet [NodeJS](https://nodejs.org/en/) og [Expressbilbioteket](https://expressjs.com/). Til å styre selve databasen, har vi benyttet [Sequelize](http://docs.sequelizejs.com/) som ORM for å mappe mellom våre objekter og databasen. Databasen baserer seg på [PostgreSQL](https://www.postgresql.org/), som har vist seg å være en godt, relasjonelt databasesystem.Grunnen til at vi valgte en relasjonell database foran feks mongodb med mongoose, var at swapi i
utgangspunktet har mange relasjoner mellom objektene. Senere i prosjeket fant vi ut at relasjonene mellom objektene ikke var så veldig viktig for oss, men da var det litt for sent å snu. Hvis vi skulle gjort prosjektet om igjen ville vi nok gått for mongodb. Sequelize gir koden vår ganske mye mer kompleksitet enn det mongodb ville gjort. Vi valgte akkurat postgresql foran andre relasjonelle databaser, pga tidligere erfaring.

## Samarbeid
Hver gruppe har bistått backenden med ett medlem hver. Grunnet varierende gruppestørrelser, har det vært ulik kapasitet til å bidra med dette. Likevel har vi kommunisert effektivt og bidratt med nødvendig funksjonalitet på individuelt nivå, samt samarbeidet på enkelte issues og merge requests. Siden vi alle er fra forskjellige grupper og dermed har ulike krav til frontend, har vi jobbet med mye ulik funksjonalitet. Som nevnt over, var dette derfor vi valgte å utvikle agilt ved å motta requests og issues fra gruppemedlemmer som behøvde nye funksjoner i applikasjonen. Dette fungerte godt for våre hensikter.
