Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "assets\original-drinks.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($sourcePath)
$width = $bmp.Width
$height = $bmp.Height

Write-Host "Image dimensions: $width x $height"

# The image has 4 cups evenly spaced horizontally.
# Let's inspect coordinates.
# Total width is 1024, height is 1024 usually (square).
# Let's crop each cup individually:
# Cup 1: Peach Orange Cloud
# Cup 2: Mango Passion Cloud
# Cup 3: Blueberry Grape Cloud
# Cup 4: Blue Lychee Cloud

# Let's calculate crop regions:
# Cup y range: from approx y = 180 to y = 780 (cup height ~600)
# Cup 1 x: ~0 to 260
# Cup 2 x: ~250 to 510
# Cup 3 x: ~500 to 760
# Cup 4 x: ~750 to 1015

$crops = @(
    @{ Name = "drink-peach-orange.png"; X = [int]($width * 0.01); Y = [int]($height * 0.18); W = [int]($width * 0.25); H = [int]($height * 0.60) },
    @{ Name = "drink-mango-passion.png"; X = [int]($width * 0.25); Y = [int]($height * 0.18); W = [int]($width * 0.25); H = [int]($height * 0.60) },
    @{ Name = "drink-blueberry-grape.png"; X = [int]($width * 0.50); Y = [int]($height * 0.18); W = [int]($width * 0.25); H = [int]($height * 0.60) },
    @{ Name = "drink-blue-lychee.png"; X = [int]($width * 0.74); Y = [int]($height * 0.18); W = [int]($width * 0.25); H = [int]($height * 0.60) }
)

foreach ($c in $crops) {
    $rect = New-Object System.Drawing.Rectangle($c.X, $c.Y, $c.W, $c.H)
    $targetBmp = New-Object System.Drawing.Bitmap($c.W, $c.H)
    $g = [System.Drawing.Graphics]::FromImage($targetBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $c.W, $c.H)
    $g.DrawImage($bmp, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    
    $outPath = Join-Path $PSScriptRoot ("assets\" + $c.Name)
    $targetBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $targetBmp.Dispose()
    Write-Host "Saved $($c.Name)"
}

$bmp.Dispose()
Write-Host "All crops saved successfully."
