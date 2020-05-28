<?php

use Illuminate\Database\Seeder;
use App\Role;
use Carbon\Carbon;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            ['id'=>1,'type' => "ADMIN"],
            ['id'=>2,'type' => "USER"]
        ];
        $data = [];
        foreach ($roles as $role) {
            $role['created_at'] = Carbon::now();
            $role['updated_at'] = Carbon::now();
            $data[] = $role;
        }
        Role::insert($data);
    }
}
