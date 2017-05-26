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

- GET /schools/name/{name}

Retrieves all schools that contain a specific name. Ex: `/schools/name/CORALINA`

```javascript
[
  {
    "code": 11006773,
    "name": "EEEFM CORA CORALINA",
    "uf": "RO",
    "municipality": "ARIQUEMES",
    "adminDependency": "Estadual",
    "participationRate": 54.74,
    "permanenceRate": "De 60% a 80%",
    "teacherTraining": 55.7,
    "approvalRate": 54.5,
    "disapprovalRate": 32.4,
    "abandonmentRate": 13.1,
    "average": 474.86400000000003
  },
  {
    "code": 11026278,
    "name": "EEEFM CORA CORALINA",
    "uf": "RO",
    "municipality": "CACOAL",
    "adminDependency": "Estadual",
    "participationRate": 85.34,
    "permanenceRate": "De 60% a 80%",
    "teacherTraining": 63,
    "approvalRate": 82.3,
    "disapprovalRate": 12.7,
    "abandonmentRate": 5,
    "average": 516.144
  },
  {
    "code": 52033368,
    "name": "COLEGIO ESTADUAL CORA CORALINA",
    "uf": "GO",
    "municipality": "GOIANIA",
    "adminDependency": "Estadual",
    "participationRate": 62.3,
    "permanenceRate": "De 40% a 60%",
    "teacherTraining": 70.5,
    "approvalRate": 86.4,
    "disapprovalRate": 9.6,
    "abandonmentRate": 4,
    "average": 492.73999999999995
  }
]
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
Optional filters: search per admin dependency, unit federation or municipality.

Examples:

`/schools/1?adm=PRI`

`schools/1?uf=RO/`

`/schools/1?adm=EST&uf=RO`

`/schools/1?uf=RO&municipality=Ariquemes`

