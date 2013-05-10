<?php

if(isset($_GET['request'])) {
    header('Content-type: application/json');
    
    $name = (empty($_POST['name'])) ? 'No name' : $_POST['name'];
    $type = (empty($_POST['type'])) ? 'No type' : $_POST['type'];
    $text = (empty($_POST['text'])) ? 'No text' : $_POST['text'];
    
    $message = <<<MAIL
{$name} has done a feature request on Yet Another Orkfia Calculator.

The feature is: {$type}

The following comment was added:
{$text}
    
MAIL;
    
    $headers = 'From: '.$name.' - YAOC <noreply@geuze.name>' . "\r\n" .
            'Reply-To: noreply@geuze.name' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();
    
    mail('rgeuze@gmail.com', 'feature request', $message, $headers);
    
    $result = array(
        'message' => 'Thank you for your feedback'
    );
    
    echo json_encode($result);
    exit();
}
?>
<div id='feature_request' class='widget'>
    <header>
        <h2>Feature request</h2>
        <a data-action='close' data-target='feature_request' title='Close' href='javascript:void(0);'>
            <img src="/orkfia/inc/images/toggle.png" width='16' height='16' alt='x'>
        </a>
    </header>
    <div class="content">
        <h3>Feature request</h3>
        <form method='post' action='javascript: void(0);'>
            <p>
                <label>Name, if you like<br>
                    <input type='text' name='name'>
                </label>
            </p>
            <p>
                <label>Feature<span title='Required'>*</span><br>
                    <select name='type' required>
                        <option value=''></option>
                        <option>Quick access to race data</option>
                        <option>Notes</option>
                        <option>Checkboxes instead of select</option>
                        <option>Visual improvements</option>
                        <option>Bugfixes(which?)</option>
                        <option>Cowbell</option>
                        <option>Automation (HAXORZZS)</option>
                        <option>Other</option>
                    </select>
                </label>
            </p>
            <p>
                <label>Explain, you should<br>
                    <textarea name='text' rows='4'></textarea>
                </label>
            </p>
            <p>
                <input type='submit' value='submit'>
            </p>
        </form>
    </div>
</div>