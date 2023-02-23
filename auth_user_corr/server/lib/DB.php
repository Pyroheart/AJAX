<?php

declare(strict_types=1);

class DB
{
    // Controller
    private ?PDO $connexion;

    public function __construct()
    {
        $this->connexion = new PDO(
            'mysql:host=localhost;port=8889;dbname=user_auth;charset=utf8;',
            'root',
            'root',
            [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]
        );
    }

    protected function getPdo(): PDO
    {
        return $this->connexion;
    }
}
