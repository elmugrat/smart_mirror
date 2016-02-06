<?php

header('Content-type: application/xml');

$handle = fopen('http://www.spiegel.de/schlagzeilen/tops/index.rss', 'r');

if ($handle) {
    while (!feof($handle)) {
        $buffer = fgets($handle, 4096);
        echo $buffer;
    }
    fclose($handle);
}

?>