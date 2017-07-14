latlng = []
print "["
for i in 1..24
  print "["
  for j in 1..1000
    srand i*j
    if i == 1
      latlng[j] = { :lat => 35.65 + Random.rand(0.1), :lng => 139.65 + Random.rand(0.1) }
    end
    print "{ :id => #{j}, :val => #{Random.rand(1.0)}, :lat => #{latlng[j][:lat]}, :lng => #{latlng[j][:lng]} }"
    if j != 1000
      print ","
    end
  end
  print "]"
  if i != 24
    print ","
  end
end
print "]"
