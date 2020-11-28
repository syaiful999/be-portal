const masterRankAndStructure = `
    type master_rank_and_structure_model {
        id:Int!
        rank:String
        level:String
        description:String
        is_active:Boolean
        created_by:String
        created_date:DateTime
        modified_by:String
        modified_date:DateTime
    }

    input inputMasterRank {
        rank:String
        level:String
        description:String
        is_active:Boolean
        created_by:Int
        created_date:DateTime
        modified_by:Int
        modified_date:DateTime
    }
    type master_rank_and_structure {
        total:Int!
        data:[master_rank_and_structure_model!]!  
    }
    extend type Query {
        master_rank_and_structures(skip:Int!, take:Int!, filter:filterInput, sort:sortInput, must_active:Boolean):master_rank_and_structure!
    }
    extend type Mutation {
        create_master_rank(data:inputMasterRank!):master_rank_and_structure_model !
        update_master_rank(data:inputMasterRank!, id:Int!):master_rank_and_structure_model !
    }
`
export default masterRankAndStructure