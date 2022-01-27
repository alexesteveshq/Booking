<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('12345'),
            'role' => 'landlord',
        ]);

        DB::table('users')->insert([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'password' => Hash::make('12345'),
            'role' => 'user',
        ]);

        DB::table('features')->insert([
            'name' => 'air conditioning',
        ]);
        DB::table('features')->insert([
            'name' => 'heating',
        ]);
        DB::table('features')->insert([
            'name' => 'elevator',
        ]);
    }
}
