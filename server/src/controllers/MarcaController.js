const { getAllMarcasService, getMarcaByIdService, createMarcaService, updateMarcaByIdService, getAllMarcasForSelectService, getAllMarcasWithTonersForSelectService, getAllMarcasWithCilindrosForSelectService, getAllMarcasWithTintasForSelectService } = require("../services/MarcaServices");
const errorResponse = require("../helper/ErrorResponseHelper");
const deleteFile = require("../helper/DeleteFileHelper");
const NotFoundError = require("../classes/NotFoundError");
const FieldUndefinedError = require("../classes/FieldUndefinedError");

async function getAllMarcas(req, res) {
   try {
      const allMarcas = await getAllMarcasService();
      return res.status(200).json(allMarcas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMarcasForSelect(req, res) {
   try {
      const allMarcas = await getAllMarcasForSelectService();
      return res.status(200).json(allMarcas);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMarcasWithTonersForSelect(req, res) {
   try {
      const allMarcas = await getAllMarcasWithTonersForSelectService();
      return res.status(200).json(allMarcas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMarcasWithCilindrosForSelect(req, res) {
   try {
      const allMarcas = await getAllMarcasWithCilindrosForSelectService();
      return res.status(200).json(allMarcas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMarcasWithTintasForSelect(req, res) {
   try {
      const allMarcas = await getAllMarcasWithTintasForSelectService();
      return res.status(200).json(allMarcas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getMarcaById(req, res) {
   try {
      const id = Number(req.params.id);

      if(!id) {
         throw new FieldUndefinedError("Campo ID não identificado");
      }

      const marca = await getMarcaByIdService(id);

      if (!marca) {
         throw new NotFoundError("Marca não encontrada", {
            fields: {
               id
            },
            data: marca
         });
      }

      return res.status(200).json(marca);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createMarca(req, res) {
   try {
      const { marca } = req.body;
      const file = req.file;

      if(!marca || !file) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               marca,
               file
            }
         });
      }

      const createdMarca = await createMarcaService({marca, img: file.filename});
      return res.status(201).json({
         status: "success",
         message: "Marca cadastrada com sucesso!",
         data: createdMarca
      });


   } catch (error) {
      if(req.file) {
         await deleteFile(req.file.filename);
      }
      errorResponse(error, res);
   }
}

async function updateMarca(req, res) {
   try {
      const id = Number(req.params.id);
      const { marca } = req.body;
      const file = req?.file;

      if(!id || (!marca && !file)) {
         throw new FieldUndefinedError("Um ou mais campos não foram identificados", {
            fields: {
               id,
               marca,
               file
            }
         })
      }

      const [rowAffect] = await updateMarcaByIdService(id, {marca, img: file?.filename});
      
      if(rowAffect > 0) {
         const newMarcaData = await getMarcaByIdService(id); 
         res.status(200).json({
            status: "success",
            message: "Informações alteradas com sucesso!",
            data: newMarcaData
         });
      }

   } catch (error) {
      if(req.file) {
         await deleteFile(req.file.filename);
      }
      errorResponse(error, res);

   }
}


module.exports = { 
   getAllMarcas, 
   getAllMarcasForSelect, 
   getAllMarcasWithTonersForSelect,
   getAllMarcasWithCilindrosForSelect,
   getAllMarcasWithTintasForSelect,
   getMarcaById, 
   createMarca, 
   updateMarca 
};