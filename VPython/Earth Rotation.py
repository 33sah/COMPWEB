#Web VPython 3.2
from vpython import *



G = 6.67e-11
ME = 5.972e24
RE = 6.378e6


G = 6.67e-11
ME = 5.972e24
RE = 6.378e6
m = 100
lat = 0
lon = 0
theta = 45
LatN = True
LongW = True
scene.lights=[]
distant_light(direction=vector(-1,0,0),color=vector(.9,.9,.9))

#setting lats and longs from input box
def lati(evt):
  global lat
  lat = evt.number *pi/180

def long(evt):
  global lon
  lon = evt.number *pi/180

#determining lat and long direction, setting a boolean to true or false to determine signs for vectors

def latDir(evt):
  global LatN
  if evt.text == "N":
    LatN = True
  else:
    LatN = False

def longDir(evt):
  global LongW
  if evt.text == "W":
    LongW = True
  else:
    LongW = False 

def setTheta(evt):
  global theta
  theta = float(evt.value) *pi/180 
  ts_caption.text = "Theta = "+"{:1.2f}".format(ts.value) + "\n\n"

#converts lats and longs to cartesian (hopefully)
def lToCart(la, lo):
  global LatN ,LongW
  x= RE*cos(la)*cos(lo)
  y= RE*cos(la)*sin(lo)
  z= RE*sin(la)
  if LongW:
    x = -x
  if lo<=pi/2:
    y = -y
  if LatN is False:
    z = -z
  return x,y,z
northButton = radio(bind = latDir , text = "N", name = "latDir" , checked = True)
southButton = radio(bind = latDir , text = "S", name = "latDir")
westButton =  radio(bind = longDir , text = "W", name = "longDir", checked = True)
eastButton = radio(bind = longDir,   text = "E", name = "longDir")
scene.append_to_caption('   ')

la =winput(bind = lati, prompt = "Latitude?" , type = "numeric", text = "Enter Lat")
lo =winput(bind = long, prompt = "Longitude" , type = "numeric", text = "Enter Long")
ts = slider(bind = setTheta, min = 0, max = 90, value = 45)
ts_caption = wtext(text = "Theta = "+"{:1.2f}".format(ts.value) + "\n\n")
label(pos = vec(0, RE + 30, 0), text = "Enter in longitude + latitude before clicking to continue.", xoffset = 20, yoffset = 50, space = 30, height = 16, border = 4, font = 'sans')

Earth = sphere(pos=vector(0,0,0),radius=RE, texture=textures.earth, shininess=0)

scene.pause()
x = lToCart(lat, lon)[0]
y = lToCart(lat, lon)[1]
z = lToCart(lat, lon)[2]
print(x,y,z)
print(LatN)
print(LongW)
mass = sphere(pos=vector(x,y,z),radius=RE/20, color=color.yellow, make_trail=True)
tilt = 0
Earth.rotate(origin=vector(0,0,0),axis=vector(0,0,1),angle=tilt)
Npole = cylinder(pos=vector(0,0,0),axis=1.5*RE*vector(-sin(tilt),cos(tilt),0),radius=0.02*RE)
Spole = cylinder(pos=vector(0,0,0),axis=-1.5*RE*vector(-sin(tilt),cos(tilt),0),radius=0.02*RE)
v0 = 5000
mass.rotate(origin=vector(0,0,0),axis=vector(0,0,1),angle=tilt)
mass.p = m*v0*vector(-cos(theta),sin(theta),0)
t = 0
dt = 0.5
w = 2*pi/(24*60**2)*norm(Npole.axis)


while t<1000 :
  rate(500)
  Earth.rotate(origin=vector(0,0,0),axis=w, angle=mag(w)*dt)
  r = mass.pos
  F = -G*ME*m*norm(r)/mag(r)**2 -2*m*cross(mass.p/m , w)
  mass.p = mass.p + F*dt 
  mass.pos = mass.pos + mass.p*dt/m
  t = t + dt
 


 



 

