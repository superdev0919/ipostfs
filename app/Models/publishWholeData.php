<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublishWholeData extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'user_id', 'publish_data', 'whole_cid'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
}