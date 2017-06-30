# enem-api

Node.js api with methods to search high schools ranked according to ENEM - a Brazilian national secondary exam. The api accesses the Mongo database created by [enem-db](https://github.com/pmelin/enem-db).

## Routes

- GET /school/code/{code}

Retrieves the details of a school by it's code. Ex: `school/code/11027290`

```javascript
{
  "code": 11027290,
  "name": "EEBP ANTONIO SANCHEZ DE LARRAGOITI Y CURDUMI",
  "uf": "RO",
  "municipality": "CACOAL",
  "adminDependency": "Privada",
  "participationRate": 96.15,
  "permanenceRate": "80% ou mais",
  "teacherTraining": 46.2,
  "approvalRate": 95.2,
  "disapprovalRate": 4.8,
  "abandonmentRate": 0,
  "average": 522.946
}
```

- GET /schools/{page}

Retrieves all schools. All requests must inform a page. Ex: `/schools/1`
```javascript
[
  {
    "code": 35399197,
    "name": "OBJETIVO COLEGIO INTEGRADO",
    "uf": "SP",
    "municipality": "SAO PAULO",
    "adminDependency": "Privada",
    "participationRate": 100,
    "permanenceRate": "De 60% a 80%",
    "teacherTraining": 100,
    "approvalRate": 100,
    "disapprovalRate": 0,
    "abandonmentRate": 0,
    "average": 763.664
  },

  {
    "code": 22025740,
    "name": "INST DOM BARRETO",
    "uf": "PI",
    "municipality": "TERESINA",
    "adminDependency": "Privada",
    "participationRate": 96.12,
    "permanenceRate": "80% ou mais",
    "teacherTraining": 81.9,
    "approvalRate": 85.7,
    "disapprovalRate": 14.3,
    "abandonmentRate": 0,
    "average": 753.744
  },
  {
    "code": 23246880,
    "name": "CHRISTUS COLEGIO PRE UNIVERSITARIO",
    "uf": "CE",
    "municipality": "FORTALEZA",
    "adminDependency": "Privada",
    "participationRate": 98.33,
    "permanenceRate": "Menos de 20%",
    "teacherTraining": 46.2,
    "approvalRate": 100,
    "disapprovalRate": 0,
    "abandonmentRate": 0,
    "average": 751.326
  },
  ...
]
```
- Optional filters: search per admin dependency, unit federation, municipality or name.

Examples:

`/schools/1?adm=PRI`

Retrieves private schools.

`schools/1?uf=AC/`

Retrieves all schools located at Acre state.

`/schools/1?uf=RO&municipality=Ariquemes`

Retrieves all schools located at Rondônia state and Ariquemes municipality.

`/schools/1?adm=PRI&uf=RO&municipality=CACOAL&name=CORA`

Retrieves all private schools located at Rondônia state and Cacoal municipality which contains the word Cora on its name.

- Optional sort/order: Schools can be sort by its position, name, unit federation or average.

Examples:

`/schools/1?sortSchl=NAME&orderSchl=DESC`

Retrieves all schools sorted by name in descending order.

`/schools/5?sortSchl=UF&orderSchl=ASC`

Retrieves all schools sorted by unit federation in ascending order. 
