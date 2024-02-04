class Investment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :coin, type: String
  field :interest, type: Float
  field :balance_init, type: Float
  field :pay, type: Float
  field :balance, type: Float

  validates :coin, :interest, :balance_init, presence: true
  validates :interest, :balance_init, :pay, :balance, numericality: { greater_than: 0 }
end
