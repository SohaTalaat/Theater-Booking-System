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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->enum('status', ['confirmed', 'cancelled'])->default('confirmed');
            $table->decimal('total_cost', 10, 2)->default(0.00);

            // Foreign Keys
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('show_id')->constrained('shows')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropForeign(['show_id']);
        });

        Schema::dropIfExists('bookings');
    }
};
