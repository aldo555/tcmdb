# TCMDb

## Setting up the backend

Head over to the backend folder and install composer dependencies
```
cd backend
composer install
```

Setup configuration
```
cp .env.example .env
```

Generate application key
```
php artisan key:generate
```

Configure MySQL Database and update .env accordingly. Also don't forget to add the OMDb key to your env.
```
OMDB_API_KEY="keygoeshere"
```

Run database migration
```
php artisan migrate
```

Run the dev server
```
php artisan serve
```

To run tests do
```
php artisan test
```

## Setting up the frontend

Get out of the backend folder and over to the frontend folder and install dependencied using the package manager of your choosing
```
cd frontend
npm install
```

Setup configuration
```
cp .env.example .env
```

Run dev
```
npm dev
```

Everything is set up! Now go to http://localhost:3000 and register an account.
