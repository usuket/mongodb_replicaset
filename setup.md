rs.conf()

rs.initiate()
rs.add("mongors002:27017")

```
rs.initiate( {
   _id : "rs0",
   members: [
      { _id: 0, host: "mongors001:27017" },
      { _id: 1, host: "mongors002:27017" },
      { _id: 2, host: "mongors003:27017" }
   ]
})
```

rs.stepDown()
