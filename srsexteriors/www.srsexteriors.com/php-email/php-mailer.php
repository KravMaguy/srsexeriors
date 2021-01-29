<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';
if (isset($_POST["name"]) && !empty($_POST["name"]) && isset($_POST["email"]) && !empty($_POST["email"]) && isset($_POST["phone"]) && !empty($_POST["phone"])
    && !empty($_POST["details"]) && isset($_POST["details"])
) {

    $description = $_POST["details"];
    $toEmail = "flex4lease@gmail.com";
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];

    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = gethostname();
    $mail->SMTPAuth = true;
    $mail->Username = 'andrew@stormrestorationspecialists.com';
    $mail->Password = 'YM@[KXZOBR5M';
    $mail->setFrom('andrew@stormrestorationspecialists.com');
    $mail->addAddress('flex4lease@gmail.com');
    $mail->Subject = 'Here is the subject';
    $mail->Body = " name: " . $name . "\n address: " . $address . "\n phone: " . $phone . "\n comment description: " . $description;

    $mail->send();

    if ($mail->send()) {
        echo json_encode(['success' => true, 'content' => $content, 'sender' => $email]);
    } else {echo json_encode(['success' => 'false', 'mailer error' => $mail->ErrorInfo]);

    }
} else {
    echo json_encode(['status' => 'fail']);
    exit;
}
