class DepositsController < ApplicationController
  def index
    @deposits = Deposit.all
  end
end
