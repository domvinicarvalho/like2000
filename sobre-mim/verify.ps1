$c = Get-Content 'd:/Bad Idea/LIKE 2000/perfil.html' -Raw
$i = $c.IndexOf("Editar Perfil")
if ($i -ge 0) {
  Write-Host "Found at $i"
  $start = [Math]::Max(0, $i - 40)
  $len = [Math]::Min(120, $c.Length - $start)
  Write-Host $c.Substring($start, $len)
} else {
  Write-Host "NOT FOUND"
}

$count = [regex]::Matches($c, "Editar Perfil").Count
Write-Host "Total occurrences: $count"

$smCount = [regex]::Matches($c, "sm-edit-link").Count
Write-Host "sm-edit-link occurrences: $smCount"
