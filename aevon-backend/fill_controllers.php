<?php

$models = [
    'Project', 'Service', 'Category', 'Technology',
    'Testimonial', 'TeamMember', 'Article', 'Faq', 'Career'
];

foreach ($models as $model) {
    $controllerName = "{$model}Controller";
    $content = <<<PHP
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\\$model;
use Illuminate\Http\Request;

class $controllerName extends Controller
{
    public function index()
    {
        return response()->json($model::all());
    }

    public function show(\$id)
    {
        \$item = $model::find(\$id);
        if (!\$item) return response()->json(['message' => 'Not found'], 404);
        return response()->json(\$item);
    }
}
PHP;

    $path = __DIR__ . "/app/Http/Controllers/Api/{$controllerName}.php";
    if (!is_dir(dirname($path))) {
        mkdir(dirname($path), 0755, true);
    }
    file_put_contents($path, $content);
    echo "Created API Controller for $model\n";
}
