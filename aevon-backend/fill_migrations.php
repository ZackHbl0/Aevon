<?php

$dir = __DIR__ . '/database/migrations';
$files = scandir($dir);

$schemas = [
    'create_projects_table' => <<<PHP
            \$table->id();
            \$table->json('title');
            \$table->json('description');
            \$table->string('slug')->unique();
            \$table->string('cover_image')->nullable();
            \$table->json('gallery')->nullable();
            \$table->json('technologies')->nullable();
            \$table->string('live_demo_url')->nullable();
            \$table->string('github_url')->nullable();
            \$table->json('case_study')->nullable();
            \$table->string('client_name')->nullable();
            \$table->date('completion_date')->nullable();
            \$table->string('project_type')->nullable();
            \$table->boolean('is_featured')->default(false);
            \$table->json('performance_metrics')->nullable();
            \$table->timestamps();
PHP,
    'create_services_table' => <<<PHP
            \$table->id();
            \$table->json('title');
            \$table->json('description');
            \$table->string('icon')->nullable();
            \$table->integer('order')->default(0);
            \$table->timestamps();
PHP,
    'create_categories_table' => <<<PHP
            \$table->id();
            \$table->json('name');
            \$table->string('slug')->unique();
            \$table->timestamps();
PHP,
    'create_technologies_table' => <<<PHP
            \$table->id();
            \$table->string('name');
            \$table->string('icon')->nullable();
            \$table->timestamps();
PHP,
    'create_testimonials_table' => <<<PHP
            \$table->id();
            \$table->string('client_name');
            \$table->string('client_role')->nullable();
            \$table->string('client_avatar')->nullable();
            \$table->json('content');
            \$table->boolean('is_featured')->default(false);
            \$table->timestamps();
PHP,
    'create_team_members_table' => <<<PHP
            \$table->id();
            \$table->string('name');
            \$table->json('role');
            \$table->string('avatar')->nullable();
            \$table->string('linkedin_url')->nullable();
            \$table->string('twitter_url')->nullable();
            \$table->timestamps();
PHP,
    'create_articles_table' => <<<PHP
            \$table->id();
            \$table->json('title');
            \$table->string('slug')->unique();
            \$table->string('cover_image')->nullable();
            \$table->json('content');
            \$table->boolean('is_published')->default(false);
            \$table->timestamp('published_at')->nullable();
            \$table->timestamps();
PHP,
    'create_messages_table' => <<<PHP
            \$table->id();
            \$table->string('name');
            \$table->string('email');
            \$table->text('message');
            \$table->boolean('is_read')->default(false);
            \$table->timestamps();
PHP,
    'create_faqs_table' => <<<PHP
            \$table->id();
            \$table->json('question');
            \$table->json('answer');
            \$table->integer('order')->default(0);
            \$table->timestamps();
PHP,
    'create_careers_table' => <<<PHP
            \$table->id();
            \$table->json('title');
            \$table->string('slug')->unique();
            \$table->json('description');
            \$table->string('location');
            \$table->string('type');
            \$table->boolean('is_active')->default(true);
            \$table->timestamps();
PHP,
    'create_settings_table' => <<<PHP
            \$table->id();
            \$table->string('key')->unique();
            \$table->json('value');
            \$table->timestamps();
PHP,
];

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;
    foreach ($schemas as $key => $schema) {
        if (strpos($file, $key) !== false) {
            $path = $dir . '/' . $file;
            $content = file_get_contents($path);
            $tableName = str_replace('create_', '', str_replace('_table', '', $key));
            $replacement = "Schema::create('" . $tableName . "', function (Blueprint \$table) {\n" . $schema . "\n        });";
            $content = preg_replace('/Schema::create\(.*?, function \(Blueprint \$table\) \{.*?\}\);/s', $replacement, $content);
            file_put_contents($path, $content);
            echo "Updated $file\n";
        }
    }
}
