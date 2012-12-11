#!/usr/bin/env python

import base64
import cgi
import datetime
import wsgiref.handlers
import webapp2

from google.appengine.ext import db
from google.appengine.api import images
from google.appengine.ext import webapp

class Imagemodel(db.Model):
  uid = db.StringProperty()
  iid = db.StringProperty()
  image = db.BlobProperty()
  date = db.DateTimeProperty(auto_now_add=True)


class saveimage(webapp2.RequestHandler):
    def post(self):
		imagemodel = Imagemodel()
		imagemodel.uid=self.request.get('id')
		rimg = str(self.request.get('image'))
		imagemodel.image=db.Blob(rimg)
			count = db.GqlQuery("SELECT * FROM Imagemodel")
			j=0
			for i in count:
			  j+=1
		imagemodel.iid=str(j)
		imagemodel.put()
		self.response.out.write(j)
	

class printimage(webapp2.RequestHandler):
    def get(self,iid):
        newmodel = Imagemodel()
        img = newmodel.gql("WHERE iid=:1",iid)
        if iid:
          for cimg in img:
            if cimg.image:
              #  self.response.out.write("""
              #    <html><head><title>Pixelite Image Editor</title></head><body style="background: #111; margin: 0px; padding: 0px;">
              #      <div style="text-align: center; margin: 20px; font-family: impact; font-size: 35px; text-shadow: 5px 5px #000; color: #444;">
              #        PIXELITE IMAGE EDITOR
              #      </div>
              #      <div style="text-align: center;">
              #  """)
              #  self.response.out.write("<img src='")
                self.response.out.write(cimg.image)
              #  self.response.out.write("""' style="border: 5px solid #222; box-shadow: 5px 5px #000;" />""")
              #  self.response.out.write("""
              #    </div>
              #    <div style="text-align: center; font-family: Verdana; margin-top: 30px;">
              #      <style>
              #      #applink {
              #        padding: 10px;
              #        background: #333;
              #        border-radius: 5px;
              #        color: #F60;
              #        text-decoration: none;
              #        box-shadow: 5px 5px #000;
              #      }
              #      #applink:hover {
              #        background: #444;
              #      }
              #      </style>
              #      <a href='../' id='applink'><img src='../favicon.ico' style='height: 20px;'> USE PIXELITE</a>
              #    </div>
              #    </body>
              #  """)
            else:
                self.error(404)
        else:
          self.error(404)

class validate(webapp2.RequestHandler):
    def get(self):
        self.response.out.write("""<script>window.location='./start'</script>""")

class facebook(webapp2.RequestHandler):
    def post(self):
        self.response.out.write("""<script>window.location='../'</script>""")

class share(webapp2.RequestHandler):
    def get(self,iid):
        #self.response.out.write("Share Image #")
        #self.response.out.write(iid)
        #self.response.out.write("<br /><a href='../image/"+iid+"'>Click</a>")
        self.response.out.write("<script>window.location='../image/"+iid+"';</script>")


app = webapp2.WSGIApplication([('/', validate),
                               ('/facebook/', facebook),
                               ('/save', saveimage),
                               (r'/image/(.*)', printimage),
                               (r'/share/(.*)', share),
                              ],
                              debug=True)
