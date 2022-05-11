const { id } = require("../../../generator_id/generator_id");
const header_penjualan = require("../../models/penjualan/header_penjualan");
const detail_penjualan = require("../../models/penjualan/detail_penjualan");
const header_po_penjualan = require("../../models/po_penjualan/header_po_penjualan");
const produk = require("../../models/produk/produk");
const pelanggan = require("../../models/pelanggan/pelanggan");
const moment = require("moment");
const { Op } = require("sequelize");

exports.uploadbuktibayar = async function (req, res) {
  const { id_penjualan } = req.params;

  try {
    // res.json(req.file)
    if (req.file) {
      await header_penjualan
        .findOne({ where: { id_penjualan: id_penjualan } })
        .then((hasil) => {
          hasil.update({
            bukti_bayar_penjualan: `http://localhost:1234/uploads/bukti_bayar_penjualan/${req.file.filename}`,
            status: "lunas",
          });
          res.json({
            message: "success",
            data: hasil,
          });
        });
    } else {
      res.send("no files in uploads");
    }
  } catch (err) {
    res.json({
      message: "error",
      data: err,
    });
  }
};

exports.getPenjualan = async function (req, res) {
  const { id_pelanggan } = req.params;
  const { start, limit, end, status } = req.query;
  let header;
  let detail;
  try {
    if (id_pelanggan) {
      header = await header_penjualan.findAll(
        start && end
          ? {
              where: {
                id_pelanggan: id_pelanggan,
                createdAt: {
                  [Op.between]: [
                    moment(start).format("YYYY-MM-DD"),
                    moment(end).format("YYYY-MM-DD"),
                  ],
                },
              },
              limit: limit ? parseInt(limit) : 10,
              order: [["createdAt", "DESC"]],
            }
          : {
              where: {
                id_pelanggan: id_pelanggan,
                status: status ? status : "belum lunas",
              },
              limit: limit ? parseInt(limit) : 10,
              order: [["createdAt", "DESC"]],
            }
      );
      detail = await detail_penjualan.findAll();
      let arrProduk = await produk.findAll();
      let arrPelanggan = await pelanggan.findAll();

      res.status(200).json({
        message: "success",
        data: header.map((item) => ({
          createdAt: item.createdAt,
          id_penjualan: item.id_penjualan,
          id_pelanggan: item.id_pelanggan,
          image: item.bukti_bayar_penjualan,
          data_pelanggan: {
            id_pelanggan: arrPelanggan.filter(
              (pelanggan) => pelanggan.id_pelanggan === item.id_pelanggan
            )[0].id_pelanggan,
            nama_pelanggan: arrPelanggan.filter(
              (pelanggan) => pelanggan.id_pelanggan === item.id_pelanggan
            )[0].nama_pelanggan,
            alamat_pelanggan: arrPelanggan.filter(
              (pelanggan) => pelanggan.id_pelanggan === item.id_pelanggan
            )[0].alamat_pelanggan,
            no_telepon: arrPelanggan.filter(
              (pelanggan) => pelanggan.id_pelanggan === item.id_pelanggan
            )[0].no_telepon,
          },
          total: item.total,
          catatan: item.catatan,
          status: item.status,
          image: item.bukti_bayar_penjualan,
          tanggal_jatuh_tempo: item.tanggal_jatuh_tempo,
          list_produk: detail
            .filter((detail) => detail.id_penjualan === item.id_penjualan)
            .map((detail) => ({
              id_produk: detail.id_produk,
              nama_produk: arrProduk.filter(
                (produk) => produk.id_produk === detail.id_produk
              )[0].nama_produk,
              qty: detail.qty,
              harga_produk: detail.harga_produk,
            })),
        })),
        // data2:header
      });
    } else {
      header = await header_penjualan.findAll(
        start && end
          ? {
              where: {
                createdAt: {
                  [Op.between]: [
                    moment(start).format("YYYY-MM-DD"),
                    moment(end).format("YYYY-MM-DD"),
                  ],
                },
                status: status,
              },
              limit: limit ? parseInt(limit) : 10,
              order: [["createdAt", "DESC"]],
            }
          : {
              limit: limit ? parseInt(limit) : 10,
              order: [["createdAt", "DESC"]],
            }
      );
      detail = await detail_penjualan.findAll();
      let arrProduk = await produk.findAll();
      let arrPelanggan = await pelanggan.findAll();

      res.status(200).json({
        message: "success",
        data: header.map((item) => ({
          createdAt: item.createdAt,
          id_penjualan: item.id_penjualan,
          id_pelanggan: item.id_pelanggan,
          data_pelanggan: {
            id_pelanggan: arrPelanggan.filter(
              (pelanggan) => pelanggan.id_pelanggan === item.id_pelanggan
            )[0].id_pelanggan,
            nama_pelanggan: arrPelanggan.filter(
              (pelanggan) => pelanggan.id_pelanggan === item.id_pelanggan
            )[0].nama_pelanggan,
            alamat_pelanggan: arrPelanggan.filter(
              (pelanggan) => pelanggan.id_pelanggan === item.id_pelanggan
            )[0].alamat_pelanggan,
            no_telepon: arrPelanggan.filter(
              (pelanggan) => pelanggan.id_pelanggan === item.id_pelanggan
            )[0].no_telepon,
          },
          total: item.total,
          catatan: item.catatan,
          status: item.status,
          image: item.bukti_bayar_penjualan,
          tanggal_jatuh_tempo: item.tanggal_jatuh_tempo,
          list_produk: detail
            .filter((detail) => detail.id_penjualan === item.id_penjualan)
            .map((detail) => ({
              id_produk: detail.id_produk,
              nama_produk: arrProduk.filter(
                (produk) => produk.id_produk === detail.id_produk
              )[0].nama_produk,
              qty: detail.qty,
              harga_produk: detail.harga_produk,
            })),
        })),
        total: header.reduce(
          (sum, { total }) => parseInt(sum) + parseInt(total),
          0
        ),
        // data2:header
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

exports.addPenjualan = async function (req, res) {
  const {
    id_produk,
    qty,
    id_po_penjualan,
    list_produk,
    total,
    id_pelanggan,
    catatan,
    tanggal_jatuh_tempo,
  } = req.body;
  let id_penjualan = `PENJ${id * total}`;
  let header;
  let detail = [];

  try {
    await header_po_penjualan
      .findOne({ where: { id_po_penjualan: id_po_penjualan } })
      .then((hasil) => {
        hasil.update({
          status: "approve",
        });
      });

    header = await header_penjualan.create({
      id_penjualan: id_penjualan,
      id_pelanggan: id_pelanggan,
      tanggal_jatuh_tempo: new Date(
        moment(tanggal_jatuh_tempo).format("YYYY-MM-DD")
      ),
      status: "belum lunas",
      total: total,
      catatan: catatan,
    });

    list_produk.map(async (item) => {
      detail.push(
        await detail_penjualan.create({
          id_penjualan: id_penjualan,
          id_produk: item.id_produk,
          harga_produk: item.harga_produk,
          qty: item.qty,
        })
      );

      await produk
        .findOne({ where: { id_produk: item.id_produk } })
        .then((hasil_produk) => {
          hasil_produk.update({
            qty: JSON.stringify(
              parseInt(hasil_produk.qty) - parseInt(item.qty)
            ),
          });
        });
    });

    res.status(200).json({
      message: "success",
      header: header,
      detail: detail,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};
