const penugasan = `
    type master_penugasan_model {
        id:Int!
        ketua_tim_id:Int
        ketua_tim_nama:String
        penandatangan_id:Int
        penandatangan_name:String
        penandatangan_rank:String
        penandatangan_level:String
        penandatangan_no:String
        subjek:String
        perihal:String
        bko:String
        satker:String
        no_sprindik:String
        tanggal_mulai:DateTime
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }
    type master_penugasan {
        total:Int!
        data:[master_penugasan_model!]!
    }
    input input_master_penugasan {
        ketua_tim_id:Int
        ketua_tim_nama:String
        subjek:String
        perihal:String
        bko:String
        satker:String
        penandatangan_id:Int
        no_sprindik:String
        tanggal_mulai:DateTime
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }

    type transact_personil_model {
        id:Int!
        id_penugasan:Int
        id_personil:Int
        nama_personil:String
        rank:String
        level:String
        nomor_personil:String
        is_active:Boolean
        no_sprindik:String
        tanggal_mulai:DateTime
    }
    type transact_personil {
        total:Int!
        data:[transact_personil_model!]!
    }
    input input_transact_personil {
        id_penugasan:Int
        id_personil:Int
        nama_personil:String
        is_active:Boolean
    }

    type transact_tersangka_model {
        id:Int!
        id_penugasan:Int
        nama_tersangka:String
        agama:String
        alamat:String
        tempat_lahir:String
        pekerjaan:String
        kewarganegaraan:String
        jenis_kelamin:String
        tanggal_lahir:DateTime
        is_active:Boolean
    }
    type transact_tersangka {
        total:Int!
        data:[transact_tersangka_model!]!
    }
    input input_transact_tersangka {
        id_penugasan:Int
        nama_tersangka:String
        agama:String
        alamat:String
        tempat_lahir:String
        pekerjaan:String
        kewarganegaraan:String
        jenis_kelamin:String
        tanggal_lahir:DateTime
        is_active:Boolean
    }

    type total_personil_terlibat {
        total:Int!
    }
    type total_tersangka_terlibat {
        total:Int!
    }

    extend type Query {
        master_penugasan(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_penugasan!
        transact_personil(id:Int, must_active:Boolean):transact_personil!
        transact_tersangka(id:Int, must_active:Boolean):transact_tersangka!
        total_personil_terlibat:total_personil_terlibat
        total_tersangka_terlibat:total_tersangka_terlibat
        transact_personil_penugasan(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):transact_personil!
    }
    extend type Mutation {
        create_master_penugasan(data:input_master_penugasan!):master_penugasan_model!
        update_master_penugasan(data:input_master_penugasan!, id:Int!):master_penugasan_model!

        create_transact_personil(data:input_transact_personil!):transact_personil_model!
        remove_transact_personil(id:Int!):transact_personil_model!
        delete_transact_personil(data:input_transact_personil!):transact_personil_model

        create_transact_tersangka(data:input_transact_tersangka!):transact_tersangka_model!
        remove_transact_tersangka(id:Int!):transact_tersangka_model!
        delete_transact_tersangka(data:input_transact_personil!):transact_tersangka_model
    }
`
export default penugasan