import logging

logger = logging.getLogger('celery_logging')
logger.setLevel(logging.INFO)
ch = logging.FileHandler('celery_logging.log')
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)
#logger.info('info message')

