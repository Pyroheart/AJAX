<?php
// On n'oublie pas que tous ce qui est afficher dans un fichier server lors d'une requête ajax est renvoyé à celle-ci.

// Logique de contrôle des champs
if (isset($_POST) && !empty($_POST)) {
    // Check Empty fields
    if (!in_array('', $_POST)) {
        // Extraction du post
        extract($_POST);
        // Check Unity field
        // Check name
        if (strlen($name) <= 30) {
            // Check Email
            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                // Check pwd
                if (strlen($password) >= 6) {
                    // Donc on appel pas pdo tant qu'on est pas sur de l'utiliser
                    require 'lib/UserModel.php';
                    $userM = new UserModel;
                    // Check if user exist
                    $user = $userM->findByEmail($email);
                    // Check
                    if (!$user) {
                        // Insertion si post === OK
                        // Hashage pwd
                        $passwordHashed = password_hash($password, PASSWORD_DEFAULT);
                        // Process Insert
                        $q = $userM->insert($name, $email, $passwordHashed, date($birthdate));
                        // Notif
                        $notif = 'L\'utilisateur a été enregistré avec succès';
                    } else $error = 'Un utilisateur existe déjà avec cet email';
                } else $error = 'Le champ password est trop court';
            } else $error = 'Le champ email n\'est pas valide';
        } else $error = 'Le champ name est trop long';
    } else $error = 'Il y a un champ vide';
} else $error = 'Le formulaire est vide';
// Sinon envoi d'un message d'erreur
echo json_encode([
    'result' => $notif ?? $error,
    'user'   => $q ?? null
]);
