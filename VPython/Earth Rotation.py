from vpython import *
import numpy


G = 6.67e-11
ME = 5.972e24
RE = 6.378efrom vpython import *



G = 6.67e-11
ME = 5.972e24
RE = 6.378e6
m = 100
lat = 0
lon = 0
theta = 2
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
    LatN == True
  else:
    LatN == False

def longDir(evt):
  global LongW
  if evt.text == "N":
    LongW == True
  else:
    LongW == False 

def setTheta(evt):
  global theta
  theta = float(evt.value) *pi/180 
  ts_caption.text = "Theta = "+"{:1.2f}".format(ts.value) + "\n\n"

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
mass = sphere(pos=RE*vector(-cos(lat),sin(lat),0),radius=RE/20, color=color.yellow, make_trail=True)
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
print(theta)
print(lat)
print(lon)
while mag(mass.pos)+1 >= RE -1:
  rate(500)
  Earth.rotate(origin=vector(0,0,0),axis=w, angle=mag(w)*dt)
  r = mass.pos
  F = -G*ME*m*norm(r)/mag(r)**2 -2*m*cross(mass.p/m , w)
  mass.p = mass.p + F*dt 
  mass.pos = mass.pos + mass.p*dt/m
  t = t + dt
 


 


m = 100
lat = 0
lon = 0
theta = 45*pi/180
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
    LatN == True
  else:
    LatN == False

def longDir(evt):
  global LongW
  if evt.text == "N":
    LongW == True
  else:
    LongW == False 

def setTheta(evt):
  global theta
  theta = float(evt.value) *pi/180 
  ts_caption.text = "Theta = "+"{:1.2f}".format(ts.value) + "\n\n"

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
mass = sphere(pos=RE*vector(-cos(lat),sin(lat),0),radius=RE/20, color=color.yellow, make_trail=True)
tilt = 0
Earth.rotate(origin=vector(0,0,0),axis=vector(0,0,1),angle=tilt)
Npole = cylinder(pos=vector(0,0,0),axis=1.5*RE*vector(-sin(tilt),cos(tilt),0),radius=0.02*RE)
Spole = cylinder(pos=vector(0,0,0),axis=-1.5*RE*vector(-sin(tilt),cos(tilt),0),radius=0.02*RE)
v0 = 5000
mass.rotate(origin=vector(0,0,0),axis=vector(0,0,1),angle=tilt)
mass.p = m*v0*vector(-cos(theta),sin(theta), 0)
t = 0
dt = 0.5
w = 2*pi/(24*60**2)*norm(Npole.axis)
print(theta)
print(lat)
print(lon)
while mag(mass.pos)+1 >= RE -1:
  rate(500)
  Earth.rotate(origin=vector(0,0,0),axis=w, angle=mag(w)*dt)
  r = mass.pos
  F = -G*ME*m*norm(r)/mag(r)**2 -2*m*cross(v0*vector(-cos(theta),sin(theta), 0), w)
  mass.p = mass.p + F*dt 
  mass.pos = mass.pos + mass.p*dt/m
  t = t + dt
 


 

