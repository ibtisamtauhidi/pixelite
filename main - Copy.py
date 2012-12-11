#!/usr/bin/env python

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
	imagemodel.image=db.Blob(str(self.request.get('image')))
        count = db.GqlQuery("SELECT * FROM Imagemodel")
        j=0
        for i in count:
          j+=1
	imagemodel.iid=str(j)
	imagemodel.put()
	self.response.out.write(j)
	

class printimage(webapp2.RequestHandler):
    def get(self):
        newmodel = Imagemodel()
        img = newmodel.gql("WHERE iid=:1",self.request.get('iid'))
        for cimg in img:
          if cimg.image:
              self.response.headers['Content-Type'] = "image/png"
              self.response.out.write(cimg.image)
          else:
              self.error(404)

class validate(webapp2.RequestHandler):
    def get(self):
        self.response.out.write("""<script>window.location='./start'</script>""")

class facebook(webapp2.RequestHandler):
    def get(self):
        self.response.out.write("""<script>window.location='../'</script>""")


app = webapp2.WSGIApplication([('/', validate),
                               ('/facebook/', facebook),
                               ('/save', saveimage),
                               (r'/image', printimage),
                              ],
                              debug=True)
