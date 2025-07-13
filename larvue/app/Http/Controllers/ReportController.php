<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\GenerateReportPdf;
use Illuminate\Support\Str;

class ReportController extends Controller
{
    public function generate(Request $request)
    {
        return $request->all();
        $data = $request->all();

        $fileName = 'report_' . Str::random(10) . '.pdf';

        // dispatch the job
        GenerateReportPdf::dispatch($data, $fileName);

        // return URL to be polled later
        return response()->json([
            'message' => 'PDF در حال تولید است',
            'file' => $fileName
        ]);
    }

    public function download($file)
    {
        $path = storage_path("app/public/reports/$file");

        if (!file_exists($path)) {
            return response()->json(['error' => 'فایل هنوز آماده نیست'], 404);
        }

        return response()->download($path);
    }

    public function test()
    {
        return response()->json(['message' => 'Test route is working']);
    }
}
