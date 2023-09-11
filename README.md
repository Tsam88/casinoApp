## Installation Guide

Run the commands below:

```
$ docker compose up build
$ docker compose up -d
```

After the application starts, navigate to `http://localhost:80` in your web browser:
```
$ curl localhost:80
["Blog post #0","Blog post #1","Blog post #2","Blog post #3","Blog post #4"]
```

For adding new records in the DB, navigate to `http://localhost/BookmakersAdmin/BookmakersList` and `http://localhost/MenuItemsAdmin/MenuItemsList` in your web browser:
```
note: for mobile better check on firefox
