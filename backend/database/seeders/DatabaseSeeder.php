<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\Theater;
use App\Models\Seat;
use App\Models\Show;
use App\Models\Booking;
use App\Models\Addon;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $admin = User::firstOrCreate(
            ['email' => 'soha@admin.com'],
            [
                'name' => 'Soha Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
            ]
        );

        $user1 = User::create([
            'name' => 'Abdelrahman Ramadan',
            'email' => 'Abdelrahman@gmail.com',
            'password' => Hash::make('password'),
        ]);

        //  Theatre
        $theater = Theater::create([
            'name' => 'Downtown Cinema',
            'location' => 'City Center',
        ]);

        //  Seats
        for ($i = 1; $i <= 10; $i++) {
            Seat::create([
                'theater_id' => $theater->id,
                'seat_number' => 'A' . $i,
            ]);
        }

        //  Show
        $show = Show::create([
            'theater_id' => $theater->id,
            'title' => 'Inception',
            'show_time' => now()->addDays(1)->setTime(18, 0),
            'duration' => 120,
            'price' => 100.00,
        ]);

        //  Addons
        $popcorn = Addon::create([
            'name' => 'Popcorn',
            'price' => 50.00,
        ]);

        $soda = Addon::create([
            'name' => 'Soda',
            'price' => 30.00,
        ]);

        //  Booking (User1 books 2 seats + addons)
        $booking = Booking::create([
            'user_id' => $user1->id,
            'show_id' => $show->id,
            'status' => 'confirmed',
            'total_cost' => 280.00, // 2 seats (100 each) + popcorn (50) + soda (30)
        ]);

        // attach seats
        $booking->seats()->attach([1, 2]); // A1 and A2

        // attach addons
        $booking->addons()->attach($popcorn->id, [
            'quantity' => 1,
            'total_price' => 50.00,
        ]);

        $booking->addons()->attach($soda->id, [
            'quantity' => 1,
            'total_price' => 30.00,
        ]);
    }
}
