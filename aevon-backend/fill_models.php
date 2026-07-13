<?php

$dir = __DIR__ . '/app/Models';
$files = scandir($dir);

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;
    $path = $dir . '/' . $file;
    $content = file_get_contents($path);
    
    // Check if $guarded already exists
    if (strpos($content, '$guarded') === false) {
        $content = preg_replace(
            '/class ([a-zA-Z0-9_]+) extends Model\n\{/',
            "class $1 extends Model\n{\n    protected \$guarded = [];\n",
            $content
        );
        file_put_contents($path, $content);
        echo "Updated $file\n";
    }
}
