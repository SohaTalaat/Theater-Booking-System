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
        Schema::create('seats', function (Blueprint $table) {
            $table->id();
            $table->string('seat_number');
            $table->foreignId('theater_id')->constrained('theaters')->onDelete('cascade');
            $table->enum('status', ['available', 'booked'])->default('available');
            $table->timestamps();

            // Weak Entity Logic
            $table->unique(['theater_id', 'seat_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('seats', function (Blueprint $table) {
            $table->dropForeign(['theater_id']);
        });

        Schema::dropIfExists('seats');
    }
};
