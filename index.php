<?php
// Profile data (you can change these values)
$name = "John Doe";
$age = 28;
$location = "New York, USA";
$email = "john@example.com";
$bio = "I'm a web developer passionate about building beautiful and functional websites. I love working with PHP, JavaScript, and modern frameworks.";
$social_links = [
    'GitHub' => 'https://github.com/johndoe', 
    'LinkedIn' => 'https://linkedin.com/in/johndoe', 
    'Twitter' => 'https://twitter.com/johndoe' 
];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Profile - <?php echo $name; ?></title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="container">
    <div class="profile-card">
        <img src="https://via.placeholder.com/150"  alt="Profile Picture" class="profile-pic">
        <h1><?php echo $name; ?></h1>
        <p><strong>Age:</strong> <?php echo $age; ?></p>
        <p><strong>Location:</strong> <?php echo $location; ?></p>
        <p><strong>Email:</strong> <a href="mailto:<?php echo $email; ?>"><?php echo $email; ?></a></p>
        
        <div class="bio">
            <h2>About Me</h2>
            <p><?php echo $bio; ?></p>
        </div>

        <div class="social-links">
            <h3>Social Media</h3>
            <ul>
                <?php foreach ($social_links as $platform => $url): ?>
                    <li><a href="<?php echo $url; ?>" target="_blank"><?php echo $platform; ?></a></li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>
</div>

</body>
</html>
