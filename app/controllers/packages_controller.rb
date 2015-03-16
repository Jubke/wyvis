class PackagesController < ApplicationController
  expose :package, attributes: :package_params
  expose(:packages) { Package.order('LOWER(name) ASC') }

  # GET /packages
  def index
  end

  # GET /packages/1
  def show
  end

  # GET /packages/new
  def new
  end

  # GET /packages/1/edit
  def edit
  end

  # POST /packages
  def create
    if package.save
      redirect_to package, notice: 'Package was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /packages/1
  def update
    if package.update(package_params)
      redirect_to package, notice: 'Package was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /packages/1
  # DELETE /packages/1.json
  def destroy
    package.destroy
    redirect_to packages_url, notice: 'Package was successfully destroyed.'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def package_params
      params.require(:package).permit(:name,:short,:description,:url,:cdn_url,:license,:latest_version,:web_standards,:support)
    end
end
