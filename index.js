'use strict';
var
  // �����С��ѥ饤�֥�� `express` �Υ���
  express = require('express'),
  // �����С����󥹥��󥹤ν����
  app = express(),
  // �Ķ��ѿ��� `PORT` ������Ф����ͤ򡢤ʤ���� 3000 �����
  port = process.env.PORT || 3000,
  // �ꥯ�����Ȥ˴ޤޤ��ǡ����μ��Ф��������饤�֥��Υ���
  parser = require('body-parser'),
  // �ǡ����١����إ�����������饤�֥��Υ���
  knex = require('knex')({
    client: 'sqlite3',
    connection: {
      // ��������ǡ��ǡ����١�������������������ʱ�³���Ϥʤ��ʤ��
      // `filename: "somefile.sqlite"` �Ȥ��ǡ��ե�����˥ǡ�������¸�Ǥ���ʥե�����̾�ϼ�ͳ��
      filename: ":memory:"
    }
  });

// �ꥯ�����ȥǡ����� parser ��Ƴ��
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// /public �ե��������Ū���������֤����Ȥ��ƻ��� (css, image, js �ʤ�)
app.use(express.static(__dirname + '/public'))

/****************************************
  *
  * API ��������ץ�
  *
  ***************************************/

app.get('/api/dummies', function (req, res, next) {
  res.status(200).json("OK");
  return next();
});

app.post('/api/dummies', function (req, res, next) {
  res.status(400).json({
    data: req.body,
    error: "BadRequest"
  });
  return next();
});

app.delete('/api/dummies/:id', function (req, res, next) {
  res.status(404).json({
    id: req.params.id,
    error: "NotFound"
  });
});


/****************************************
  *
  * ���� API ������
  *
  ***************************************/
// GET /api/projects ���Ф���������
app./* method */(/* endpoint */, function (req, res, next) {
  res.status(501).json("NotImplemented");

  /**
    * projects �ơ��֥뤫��
    * ���ƤΥǡ�������� (SELECT) ����
    */
  return next();
});

// GET /api/projects/:id ���Ф���������
app./* method */(/* endpoint */, function (req, res, next) {
  res.status(501).json("NotImplemented");

  /**
    * projects �ơ��֥뤫��
    * �ѥ�᡼�����Ǽ�����ä� id �Ȱ��פ���ǡ��� (WHERE)
    * ����� (SELECT) ����
    *
    * ���פ���ǡ������ʤ��ä����ν�����˺�줺�� ;)
    */
  return next();
});

// DELETE /api/projects/:id ���Ф���������
app./* method */(/* endpoint */, function (req, res, next) {
  res.status(501).json("NotImplemented");

  /**
    * projects �ơ��֥뤫��
    * �ѥ�᡼�����Ǽ�����ä� id �Ȱ��פ���ǡ��� (WHERE)
    * ����� (SELECT) ����
    *
    * ���פ���ǡ������ʤ��ä����ν�����˺�줺�� ;)
    */
  return next();
});

// POST /api/projects ���Ф���������
app./* method */(/* endpoint */, function (req, res, next) {
   res.status(501).json("NotImplemented");
});


/**
  * Initialize database
  * This could work on multiple table definition also
  */
// SQL��ʸ �μ���
// ; ���ơ��֥�����ζ��ڤ�Ȥʤ�Τ� `;` �ǽ����ԤǤ����Υơ��֥��ʬ��
var sqls = require('fs')
      .readFileSync(__dirname + '/specifications/database.sql')
      .toString()
      .split(/;$/m);

var allSQLs = sqls.map(function (sql) {
  return sql.trim();
}).filter(function (sql) {
  // SQLʸ�������� `Segmentation fault: 11` ��ȯ������Τ��ڤ�ΤƤ�
  return !!sql;
}).map(function (sql) {
  return knex.raw(sql);
});

// ������SQL��¹Ԥ��ƥơ��֥���������λ�����饵���С���ư
Promise.all(allSQLs).then(function () {
  app.listen(port, function () {
    console.log("Server is running with port", port);
  });
});
