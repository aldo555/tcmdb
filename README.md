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

Configure MySQL Database and update .env accordingly

Run database migration
```
php artisan migrate
```

Run the dev server
```
php artisan serve
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
