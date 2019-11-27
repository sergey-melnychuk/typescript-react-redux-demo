# API

- download: https://github.com/ducin-public/itcorpo-api
- powered by: https://www.npmjs.com/package/json-server

----

### example install script

```
cd src
git clone https://gist.github.com/ducin/7df11e9fdf362386cbefb5faf4c00c66 typings

# (UNIX) removing git trash (avoiding git submodules)
rm -rf typings/.git
rm -rf typings/api.md

# (Windows, probably) removing git trash (avoiding git submodules)
del typings\api.md
rd /s typings\.git
```

----

resources:

- geo: `http://localhost:3000/geo`
- offices: `http://localhost:3000/offices?country=Germany`
- employees: `http://localhost:3000/employees?office_like=Germany`, `http://localhost:3000/employees?nationality=DE`
- projects: `http://localhost:3000/projects/852b697f-1d11-4cfd-ab26-5aa2f926e79d`
- benefits: `http://localhost:3000/benefits?country=Germany`

`json-server`-based API features:

- collection (first page, limited): `http://localhost:3000/employees`
- certain page: `http://localhost:3000/employees?_page=2`
- only total count: `http://localhost:3000/employees/count`
- combination (page & nationality filter): `http://localhost:3000/employees?_page=2&nationality=DE`

----

# getGeo

### promise-based

```js
fetch('http://localhost:3000/geo')
  .then(res => res.json())
  .then(console.log)
```

### async/await-based

```js
async function getGeo(){
  const res = await fetch('http://localhost:3000/geo')
  const geo = await res.json()
  return geo
}

getGeo().then(console.log)
```

----

### fetching collection total size with `X-Total-Count`:

```js
fetch('http://localhost:3000/benefits?country=Germany')
  .then(res => res.headers.get('X-Total-Count'))
  .then(console.log)
```
