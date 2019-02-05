from multiprocessing import Pool
import urllib.request
import json
from mysql.connector import MySQLConnection, Error
from python_mysql_dbconfig import read_db_config
import time
from datetime import datetime
import sys

'''Реализация многопоточной обработки информации о контактах,
загружаемой для каждого подразделения в виде Json с портала ГОСУСЛУГ
'''
 #git remote add origin https://github.com/georgepavlov/test-project.git
def update_contact(dptcod, contact):
    count = 0
    query = "UPDATE gosuslugi SET contact = %s WHERE dptcod = %s"
    args = (contact, dptcod)
    try:
        db_config = read_db_config()
        conn = MySQLConnection(**db_config)
        cursor = conn.cursor()
        upd_rec = cursor.execute(query, args)
        count = cursor.rowcount
        conn.commit()
    except Error as error:
        print(error)
        time.sleep(5)
        sys.exit(1)
    finally:
        if conn :
            cursor.close()
            conn.close()
        return count

def get_data(url):
    request = urllib.request.Request(url)
    response = urllib.request.urlopen(request)
    r = response.read().decode()
    return json.loads(r)


def make_all(dptcod):
    url_p = 'https://www.gosuslugi.ru/api/catalog/v3/departments/100006821'
    url_c = 'https://www.gosuslugi.ru/api/catalog/v3/departments/'
    dptcodList = {'044000': '56',
                  '044001': '57', '044002': '58', '044003': '59', '044004': '60', '044005': '61', '044006': '62',
                  '044007': '63',
                  '044008': '64', '044009': '65', '044010': '66', '044011': '67', '044012': '68', '044013': '69',
                  '044014': '70',
                  '044015': '72', '044016': '73', '044017': '74', '044018': '75', '044019': '76', '044020': '77',
                  '044021': '78',
                  '044022': '79', '044023': '80', '044024': '71', '044025': '81', '044026': '82', '044027': '83',
                  '044028': '84',
                  '044029': '85', '044030': '86', '044031': '87', '044032': '88', '044033': '89', '044034': '90',
                  '044040': '91',
                  '044041': '92', '044042': '93', '044043': '94', '044044': '95', '044045': '97', '044046': '96',
                  '044047': '98', '044048': '342176135'
                  }
    dptcod_id = dptcodList[dptcod]
    contact = ''
    if (dptcod != '044048'):
        url = url_p + dptcod_id
    else:
        url = url_c + dptcod_id
    count = 0
    try:
        data = get_data(url)
    except:
        print('Неудача при чтении с портала ГОСУСЛУГ: dptсod = {}'.format(dptcod))
        return dptcod, count
    contact += data['shortTitle'] + ';'
    contact += 'Руководитель: ' + data['director'] + ';'
    contact += 'Телефон: ' + data['callCenterPhone'] + ';'
    if 'inn' in data:
        contact += 'ИНН: ' + data['inn'] + ';'
    if 'orgOgrn' in data:
        contact += 'ОГРН: ' + data['orgOgrn'] + ';'
    adr = data['offices']
    adr1 = adr[0]['address']
    if 'cityArea' in adr1:
        contact += 'Адрес: '+ adr1['postIndex'] + ', ' + adr1['region'] + ', ' + adr1['city'] + ', ' \
                    + adr1['cityArea'] + ', ' + adr1['street'] +', ' + adr1['house'] + ';'
    elif 'area' in adr1:
        if adr1['city'] == 'г.Волгоград' or adr1['city'] == 'Волгоград г.':
            contact += 'Адрес: ' + adr1['postIndex'] + ', ' + adr1['region'] + ', ' + adr1['city'] + ', ' \
                       + adr1['area'] + ', ' + adr1['street'] + ', ' + adr1['house'] + ';'
        else:
            contact += 'Адрес: ' + adr1['postIndex'] + ', ' + adr1['region'] + ', ' + adr1['area'] + ', ' \
                   + adr1['city'] + ', ' + adr1['street'] + ', ' + adr1['house'] + ';'
    else:
        contact += 'Адрес: ' + adr1['postIndex'] + ', ' + adr1['region'] + ', ' + adr1['city'] + ', ' \
                    + adr1['street'] + ', ' + adr1['house'] + ';'
    contact += 'Обновлено на портале госуслуг: ' + data['updated'] + ';'
    count = update_contact(dptcod, contact)
    if (count > 0):
        print("Внимание !!! Обновлена информация о контактах: dptcod = {}".format(dptcod))
    else:
        print("Информация о контактах не изменилась: dptcod = {}".format(dptcod))
    return dptcod, count

def main():
    dptcodCls = {'044000',
                 '044001', '044002', '044003', '044004', '044005', '044006', '044007',
                 '044008', '044009', '044010', '044011', '044012', '044013', '044014',
                 '044015', '044016', '044017', '044018', '044019', '044020', '044021',
                 '044022', '044023', '044024', '044025', '044026', '044027', '044028',
                 '044029', '044030', '044031', '044032', '044033', '044034', '044040',
                 '044041', '044042', '044043', '044044', '044045', '044046', '044047',
                 '044048'
                 }
    start = datetime.now()
    print(str(start))
    results = []
    with Pool(24) as p:
        results = p.map(make_all, dptcodCls)
    upd_cnt = 0
    for dptcod, count in results:
        if (count > 0):
            print('Изменена информация о контактах: {}'.format(dptcod))
            upd_cnt += 1
    print('Обработка завершена. В таблице контактов обновлено записей: {}'.format(upd_cnt))
    end = datetime.now()
    total = end - start
    print(str(total))
    time.sleep(5)


if __name__ == '__main__':
    main()



