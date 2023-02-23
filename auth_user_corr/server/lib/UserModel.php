<?php

declare(strict_types=1);

require_once 'DB.php';

class UserModel extends DB
{
    // `C` R `UD`
    public function insert(string $name, string $email, string $passwordHashed, string $birthdate): string|false
    {
        $q = $this->getPdo()->prepare(
            'INSERT INTO user (name, email, password, registration_date, birthdate )
            VALUES (:name, :email, :password, NOW(), :birthdate)'
        );
        $q->execute([
            'name' => $name,
            'email' => $email,
            'birthdate' => $birthdate,
            'password' => $passwordHashed
        ]);

        return $this->getPdo()->lastInsertId();
    }

    public function delete(int $id): void
    {
        $q = $this->getPdo()->prepare(
            'DELETE FROM user
            WHERE id = :id'
        );
        $q->execute(['id' => $id]);
    }

    public function update(int $id, array $fields): void
    {
        // Extract
        extract($fields);

        $q = $this->getPdo()->prepare(
            'UPDATE user SET
            name = :name,
            password = :pwd,
            email = :email
            WHERE id = :id'
        );
        $q->execute([
            'id'    => $id,
            'name'  => $name,
            'email' => $email,
            'pwd'   => $password
        ]);
    }

    // C `R` UD
    public function findByEmail(string $email): bool|array
    {
        $q = $this->getPdo()->prepare('SELECT id, name, password, registration_date, role_id FROM user WHERE email = :mail');
        $q->execute(['mail' => $email]);
        return $q->fetch();
    }
}
