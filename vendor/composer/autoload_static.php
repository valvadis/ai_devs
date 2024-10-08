<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitbeecb4423fe4bfea0352e68a726f46df
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'Main\\' => 5,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Main\\' => 
        array (
            0 => __DIR__ . '/../..' . '/tasks',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitbeecb4423fe4bfea0352e68a726f46df::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitbeecb4423fe4bfea0352e68a726f46df::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitbeecb4423fe4bfea0352e68a726f46df::$classMap;

        }, null, ClassLoader::class);
    }
}
