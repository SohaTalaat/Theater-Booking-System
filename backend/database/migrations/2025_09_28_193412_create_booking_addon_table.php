<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('booking_addon', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->onDelete('cascade');

            $table->foreignId('addon_id')
                ->constrained('addons')
                ->onDelete('cascade');

            $table->integer('quantity')->default(1);
            $table->decimal('total_price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('booking_addon', function (Blueprint $table) {
            $table->dropForeign(['booking_id']);
            $table->dropForeign(['addon_id']);
        });

        Schema::dropIfExists('booking_addon');
    }
};
