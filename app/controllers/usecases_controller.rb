class UsecasesController < ApplicationController
  expose(:usecases)
  expose(:usecase, attributes: :usecase_params)
  expose(:implementations) {ImplementationDecorator.decorate_collection(usecase.implementations)}

  # GET /usecases
  def index
  end

  # GET /usecases/1
  def show
  end

  # GET /usecases/new
  def new
  end

  # GET /usecases/1/edit
  def edit
  end

  # POST /usecases
  def create
    if usecase.save
      redirect_to usecase, notice: 'Usecase was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /usecases/1
  def update
    if usecase.save
      redirect_to usecase, notice: 'Usecase was successfully updated.'
    else
      render :edit 
    end
  end

  # DELETE /usecases/1
  def destroy
    usecase.destroy
    redirect_to usecases_url, notice: 'Usecase was successfully destroyed.'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def usecase_params
      params.require(:usecase).permit(:name, :short, :description, :javascript)
    end
end
