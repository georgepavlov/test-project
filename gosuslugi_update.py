from multiprocessing import Pool
import urllib.request
import json
from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
import time
from datetime import datetime
import sys
