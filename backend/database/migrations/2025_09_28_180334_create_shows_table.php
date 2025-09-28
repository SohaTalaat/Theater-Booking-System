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
        Schema::create('shows', function (Blueprint $table) {
            $table->id();
            $table->foreignId('theater_id')
                ->constrained('theaters')
                ->onDelete('cascade');

            $table->string('title');
            $table->decimal('price', 8, 2)->nullable();
            $table->dateTime('show_time');
            $table->integer('duration')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        Schema::table('showa', function (Blueprint $table) {
            $table->dropForeign(['theater_id']);
        });

        Schema::dropIfExists('shows');
    }
};
