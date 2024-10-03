<?php

namespace Main;

require 'vendor/autoload.php';

const SOURCE = 'https://poligon.aidevs.pl/dane.txt';
const TASK = 'POLIGON';

$data = explode(PHP_EOL, trim(file_get_contents(SOURCE)));
$request = new Common\Request(TASK, $data);

echo $request->post();