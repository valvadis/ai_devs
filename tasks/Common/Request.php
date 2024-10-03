<?php

namespace Main\Common;

class Request
{
    const DESTINATION = 'https://poligon.aidevs.pl/verify';

    public function __construct(
        protected readonly string $task,
        protected readonly mixed $data,
    ) {
    }

    public function post(): string
    {
        // @todo: prepare simple DI container and inject config
        $config = require('config/local.config.php');

        $curlHandle = curl_init(self::DESTINATION);
        curl_setopt($curlHandle, CURLOPT_POST, true);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, json_encode([
            'task' => $this->task,
            'apikey' => $config['api_key'],
            'answer' => $this->data,
        ]));

        $curlResponse = curl_exec($curlHandle);
        curl_close($curlHandle);

        return $curlResponse;
    }
}